import Quill from 'quill';

export default class ImageUpload {
  quill: any;
  options: any;

  constructor(quill: any, options: any) {
    this.quill = quill;
    this.options = options;
    const toolbar = this.quill.getModule('toolbar') as any;
    toolbar.addHandler('image', this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files![0];
      if (/^image\//.test(file.type)) {
        this.saveToServer(file);
      } else {
        console.warn('You can only upload images.');
      }
    };
  }

  saveToServer(file: File) {
    const data = new FormData();
    data.append('image', file);

    fetch('/api/upload/upload-image', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        const range = this.quill.getSelection();

        // Insert the image with the URL obtained from the server
        this.quill.insertEmbed(range.index, 'image', result.imageUrl);

        // Move cursor to next line after inserting the image
        this.quill.setSelection(range.index + 1);

        // Log the current content of the editor
        console.log('Content after image upload:', this.quill.root.innerHTML);
      })
      .catch((error) => {
        console.error('Upload error', error);
      });
  }
}

Quill.register('modules/imageUpload', ImageUpload);
