const search = {

  _initialized: false,

  init: function(searchFieldContainer, classNames, placeholder) {

    const $div = $(`<div class="${classNames}"></div>`)
    const $input = $(`<input placeholder="${placeholder}">`);
    const $button = $(`<button>Search</button>`);

    const invoke = () => this.find($input.val());

    if(this._initialized)
      throw new Error("Already initialized");

    $div.append($input)
        .append($button);

    $input.on('keyup', invoke);
    $button.on('click', invoke);

    $(searchFieldContainer).append($div);

    this._initialized = true;

    return this;
  },

  new: function(container, callback) {

    if(!this._initialized)
      throw new Error("Search not initialized");

    this._elements =
          elements = Array.isArray(container) ?
                                      container : Array.from($(container)[0].children);
    this._callback = callback;

  },

  find: function(text) {

    const elements = this._elements;
    const callback = this._callback;
    const results = [];

    if(!this._initialized)
      throw new Error("Search not initialized");

    for(let element of elements) {

      if($(element).text().indexOf(text) > -1)
        results.push(element);
    }

    $(elements).hide();
    $(results).show();

    if(typeof callback === 'function')
      callback(results, text);

    return this;
  }

};
