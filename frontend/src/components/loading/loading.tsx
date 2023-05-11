import { component$ } from "@builder.io/qwik";
import "./loading.module.css";
export default component$(() => {
  return (
    <div class={"loading-body"}>
      <div class="loading-wrapper">
        <div class="loading-circle"></div>
        <div class="loading-circle"></div>
        <div class="loading-circle"></div>
        <div class="loading-shadow"></div>
        <div class="loading-shadow"></div>
        <div class="loading-shadow"></div>
      </div>
    </div>
  );
});
