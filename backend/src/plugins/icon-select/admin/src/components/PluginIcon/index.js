import React from "react";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@strapi/design-system/Box";
import { Searchbar, SearchForm } from "@strapi/design-system/Searchbar";
import { Tooltip } from "@strapi/design-system/Tooltip";
import { Typography } from "@strapi/design-system/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BaseButton } from "@strapi/design-system";
const Field = (props) => {
  console.log("FEALOASDOASDKSAKDSA", props);
  const [showPicker, setShowPicker] = useState(false);

  const { name, value, onChange } = props;

  const iconsArray = Object.keys(fas)
    .filter((icon) => {
      if (!value) {
        return true;
      }
      return icon.toLowerCase().includes(value.toLowerCase());
    })
    .sort();

  return (
    <>
      <Box>
        <Typography paddingBottom={9} style={{ fontWeight: "500" }}>
          Icons
        </Typography>
        <BaseButton
          onClick={() => setShowPicker(!showPicker)}
          paddingBottom={8}
        >
          <SearchForm>
            <Searchbar
              name="searchbar"
              value={value}
              onFocus={() => {
                console.log("FOCUAWASDSA");
              }}
              onBlur={() => {
                console.log("Blur");
              }}
              onChange={(e) => {
                const arg = {
                  target: {
                    name,
                    value: e.target.value,
                  },
                };
                onChange(arg);
              }}
              clearLabel="Clearing the asset search"
              placeholder="Icons"
            >
              Search for an icon
            </Searchbar>
          </SearchForm>
        </BaseButton>
        {showPicker && (
          <Box
            padding={5}
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
                      }}
                    >
                      <Tooltip description="Copy import">
                        <CopyToClipboard text={icon}>
                          <Typography
                            fontWeight="bold"
                            as="button"
                            type="button"
                          >
                            <FontAwesomeIcon icon={fas[icon]} />
                          </Typography>
                        </CopyToClipboard>
                      </Tooltip>
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Field;
