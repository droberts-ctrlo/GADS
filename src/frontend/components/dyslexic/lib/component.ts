import { Component } from "component";

export default class DyslexicComponent extends Component {
    $el: JQuery<HTMLElement>;

    constructor(element:HTMLElement) {
        super(element);
        this.$el = $(element);
        this.initComponent();
    }

    initComponent() {
        this.$el.on("click", ()=>{
            console.log("Dyslexic button clicked");
            $('body').toggleClass('dyslexic');
        });
    }
}