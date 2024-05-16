import { getComponentElements, initializeComponent } from "component"

export default (scope) => {
    if(getComponentElements(scope, '.graph-with-preview').length) {
        import('./lib/preview').then(({ default: PreviewComponent }) => {
            initializeComponent(scope, '.graph-with-preview', PreviewComponent)
        })
    }
}