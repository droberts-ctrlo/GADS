export default class ApiClient {
  private readonly baseUrl: any;
  private readonly headers: any;
  private readonly isDev: any;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.headers = {};
    this.isDev = window.siteConfig && window.siteConfig.isDev;
  }

  async _fetch<T extends object = object>(route: string, method: 'POST' | 'PUT' | 'GET' | 'DELETE', body: T) {
    if (!route) throw new Error('Route is undefined');

    let csrfParam = '';
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      const body = document.querySelector('body');
      const csrfToken = body ? body.getAttribute('data-csrf') : null;
      if (csrfToken) {
        csrfParam = route.indexOf('?') > -1 ? `&csrf-token=${csrfToken}` : `?csrf-token=${csrfToken}`;
      }
    }

    const fullRoute = `${this.baseUrl}${route}${csrfParam}`;

    const opts: any = {
      method,
      headers: Object.assign(this.headers),
      credentials: 'same-origin', // Needed for older versions of Firefox, otherwise cookies not sent
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return fetch(fullRoute, opts);
  }

  GET(route: string) {
    return this._fetch(route, 'GET', null);
  }

  POST<T extends object = object>(route: string, body: T) {
    return this._fetch(route, 'POST', body);
  }

  PUT<T extends object = object>(route: any, body: T) {
    return this._fetch(route, 'PUT', body);
  }

  DELETE(route: string) {
    return this._fetch(route, 'DELETE', null);
  }

  saveLayout = (id: number, layout: any) => {
    if (!this.isDev) {
      const strippedLayout = layout.map((widget: any) => ({...widget, moved: undefined}));
      return this.PUT(`/dashboard/${id}`, strippedLayout);
    }
  };

  createWidget = async (type: any) => {
    const response = this.isDev ? await this.GET(`/widget/create.json?type=${type}`) : await this.POST(`/widget?type=${type}`, null);
    return await response.json();
  };

  getWidgetHtml = async (id: number) => {
    const html = this.isDev ? await this.GET(`/widget/${id}/create`) : await this.GET(`/widget/${id}`);
    return html.text();
  };

  deleteWidget = (id: number) => !this.isDev && this.DELETE(`/widget/${id}`);

  getEditForm = async (id: number) => {
    const response = await this.GET(`/widget/${id}/edit`);
    return response.json();
  };

  saveWidget = async (url: string, params: any) => {
    const result = this.isDev ? await this.GET(`/widget/update.json`) : await this.PUT(`${url}`, params);
    return await result.json();
  };
}
