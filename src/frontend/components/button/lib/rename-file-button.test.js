window.$ = window.jQuery = require('jquery');

//It may be worth noting that due to the nature of async and promises, the button isn't always returned immediately
//when using the import().then() syntax. This is why we use async instead of promises to test the functionality.
//Compatibility does dictate, however, that we use the import().then() syntax for the actual implementation because
//IE11 does not support async/await. Although, ironically, it also doesn't _officially_ support `import().then()`
// but WebPack is able to pick that up and solve it for us!
describe('rename-file-button', () => {
    const modal = `
    <div class="modal fade" id="renameModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <input type="hidden" name="csrf_token" value="[% csrf_token %]">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Rename file</h4>
            </div>
            <div class="modal-body">
              <input id = "new_name" name = "new_name" required />
              <input type="hidden" name="file_id" id="file_id" value="" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              <button id="rename_button" type="button" name="rename" value="rename" class="btn btn-primary">Confirm</button>
            </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    `

    const button = `<button type="button" id="renameButton" data-toggle="modal" data-target="#renameModal" data-id = "1" data-filename="file.txt">Rename</button>'`

    const dom = ()=> {
        const div = document.createElement('div');
        const m= $(modal)[0]
        const b= $(button)[0]
        div.appendChild(m);
        div.appendChild(b);
        return div;
    }

    beforeEach(()=>{
        document.body.append(dom());
    });

    afterEach(()=>{
        document.body.innerHTML = '';
    });

    it('creates the correct button',async ()=>{
        const button = document.getElementById('renameButton');
        const {default: RenameFileButtonComponent} = await import('./rename-file-button-component.js')
        const buttonComponent = new RenameFileButtonComponent(button)
        expect(buttonComponent).toBeTruthy();
    })

    it('file name should be populated', async ()=> {
        const button = document.getElementById('renameButton');
        const {default: RenameFileButtonComponent} = await import('./rename-file-button-component.js')
        new RenameFileButtonComponent(button)
        $(button).trigger('click');
        expect($('#new_name').val()).toEqual('file.txt');
    });

    it('file id should be populated', async ()=> {
        const button = document.getElementById('renameButton');
        const {default: RenameFileButtonComponent} = await import('./rename-file-button-component.js')
        new RenameFileButtonComponent(button)
        $(button).trigger('click');
        expect($('#file_id').val()).toEqual('1');
    });

    it('should upload request', async ()=> {
        const modal = document.getElementById('renameModal');
        const button = document.getElementById('renameButton');
        const {default: RenameFileButtonComponent} = await import('./rename-file-button-component.js')
        const buttonComponent = new RenameFileButtonComponent(button)
        const spy = jest.spyOn(buttonComponent, 'upload');
        $(button).trigger('click');
        const modalButton = $(modal).find('#rename_button');
        modalButton.trigger('click');
        setTimeout(() => {
            expect(spy).toHaveBeenCalled();
        }, 500);
    });
});