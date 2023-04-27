import React, { useState, useRef } from 'react';
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@strapi/design-system/Box";
import { Searchbar, SearchForm } from "@strapi/design-system/Searchbar";
import { Tooltip } from "@strapi/design-system/Tooltip";
import { Typography } from "@strapi/design-system/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";

// https://strapi.io/blog/how-to-build-a-strapi-custom-field-for-text-generation-with-open-ai
// https://www.thirdrocktechkno.com/blog/how-to-create-a-font-awesome-icons-plugin-for-strapi-cms/

const Field = ({ name, value, onChange }) => {
  const [show, setShow] = useState(false)
  const fabArray = Object.keys(fab).map(x => {
    return `fab ${x}`
  })
  const fasArray = Object.keys(fas).map(x => {
    return `fas ${x}`
  })
  const iconsArray = [].concat(fabArray,fasArray)
    .filter((icon) => {
      if (!value) {
        return true;
      }
      return icon.toLowerCase().includes(value.toLowerCase());
    })
    .sort();
  const getIcon = (icon) => {
    const iconName = icon.split(" ")[1] || ""
    if (icon.includes('fab')){
      return fab[iconName]
    }
    if (icon.includes('fas')){
      return fas[iconName]
    }
  }
  return (
    <>
      <Box>
        <Typography paddingBottom={9}>{name}</Typography>
        <Box paddingBottom={1}>
          <SearchForm>
            <Searchbar
              name="searchbar"
              value={value}
              onChange={(e) => {
                const arg = {
                  target: {
                    name,
                    value: e.target.value,
                  },
                };
                onChange(arg);
              }}
              onFocus={() => {
                setShow(true)
              }}
              onClear={() => {
                const arg = {
                  target: {
                    name,
                    value: "",
                  },
                };
                onChange(arg);
              }}
              clearLabel="Clear"
              placeholder="Type to search"
            >
              Search for an icon
            </Searchbar>
          </SearchForm>
        </Box>
        {show &&
        <Box
          padding={1}
          height="280px"
          overflow="scroll"
          background="neutral100"
        >
          <Grid>
            {iconsArray.map((icon) => {
              return (
                <GridItem
                  padding={2}
                  col={2}
                  key={icon}
                  background={"neutral0"}
                >
                  <Box
                    onClick={() => {
                      const arg = {
                        target: {
                          name,
                          value: icon,
                        },
                      };
                      onChange(arg);
                      setShow(false)
                    }}
                  >
                    <Tooltip description="Select Icon">
                      <CopyToClipboard text={icon}>
                        <Typography fontWeight="bold" as="button" type="button">
                          <FontAwesomeIcon icon={getIcon(icon)} />
                        </Typography>
                      </CopyToClipboard>
                    </Tooltip>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box> }
      </Box>
    </>
  );
};

export default Field;
