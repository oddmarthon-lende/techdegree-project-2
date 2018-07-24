const pagination = {

  _initialized: false,

  // Sets up the pagination links container and initializes the pagination object
  init: function(paginationLinksContainer, elementsPerPage) {

    const $div = $('<div class="pagination"></div>');
    const $ul  = $('<ul></ul>');
    const self = this;

    if(this._initialized)
      throw new Error("Already initialized");

    $div.append($ul);
    $(paginationLinksContainer).append($div);

    this._$links = $ul;
    this._initialized = true;
    this._perPage = elementsPerPage || 10;

    $ul.on('click', 'a', function(e) {
      e.preventDefault();
      self.page(parseInt($(this).text()));
    });

    return this;
  },

  // Paginate children in container
  new: function(container) {

    let elements,
        $links = this._$links;

    if(!this._initialized)
      throw new Error("Pagination not initialized");

    this._elements =
          elements = Array.isArray(container) ?
                                      container : Array.from($(container)[0].children);

    $links.html('');

    if(!elements.length)
      return this;

    for(var i = 0; i < Math.ceil(elements.length / this._perPage); i++) {

      const $link = $(`
        <li>
          <a href="#">${i + 1}</a>
        </li>
      `);

      $links.append($link);

    }

    this.page(1);

    return this;
  },

  // Show elements in page number and hide the rest
  page: function(page) {

    const elements = this._elements;
    const perPage = this._perPage;
    const $links  = this._$links.find('a');
    const start = (page - 1) * perPage;
    const end   = (start + perPage);
    const range = elements.slice(start, end);

    $(elements).hide();
    $(range).show();

    for(let link of $links) {
      if(parseInt($(link).text()) === page)
        $(link).addClass('active')
      else {
        $(link).removeClass('active')
      }
    }

    return this;
  }
};
