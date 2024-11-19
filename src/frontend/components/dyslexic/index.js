import { initializeComponent } from "component"
import DyslexicComponent from "./lib/component"

export default (scope) => {
    initializeComponent(scope, ".toggle-js-dyslexic", DyslexicComponent);
}