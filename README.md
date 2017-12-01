# @chevtek/angular-spinners
A library for easily managing loading spinners in complex Angular2+ applications.

> ## NOTICE
> `@chevtek/angular-spinners` v5 or higher is now for Angular 2 or higher. If you are looking to install the old version for AngularJS 1.x you may run `npm install angular-spinners@3.1.2`. Note the lack of `@chevtek/` in front of the package name. The older versions of this package were not published under the Chevtek scope. That version is considered deprecated and is no longer supported unless I find a major issue, but feel free to continue using it as it has proven to be quite reliable in AngularJS 1.x. You will never see changes to the old version of angular-spinners except in the case of potential patch versions (3.1.x) if anything major gets reported for the old version.

### Install

> $ npm i @chevtek/angular-spinners --save

If you're running npm v8 or higher then `--save` is implied if you don't include it.

### Quick Start

```typescript
import { SpinnerModule } from '@chevtek/angular-spinners';

@NgModule({
  imports: [
    BrowserModule,
    SpinnerModule,
    ...
  ]
  ...
})
export class AppModule { }
```

Next simply drop a spinner directive in your app. The only required attribute is `name`.

```html
<spinner name="mySpinner"></spinner>
```

Now just inject the `SpinnerService` wherever you need it.

```typescript
import { SpinnerService } from '@chevtek/angular-spinners';

@Injectable()
export class YourService {

  public constructor(protected spinnerService: SpinnerService) {}

  beginSomeOperation(): void {
    this.spinnerService.show('mySpinner');
    this.doSomething().then(() => {
      this.spinnerService.hide('mySpinner');
    });
  }
}
```

Here is a [working demo](https://embed.plnkr.co/jgHVBg7nwqThktFwcuHj/).

---

### Spinner Component

The spinner component gives you several options.

#### name: string

The name attribute is required. It is what you must pass to the service when trying to show/hide that specific spinner.

```html
<spinner name="mySpinner"></spinner>
```

#### group: string

Optionally a group name may be specified so that you can show/hide groups of spinners.

```html
<spinner name="mySpinner" group="foo"></spinner>
<spinner name="mySpinner2" group="foo"></spinner>
<spinner name="mySpinner3" group="bar"></spinner>
```

```typescript
@Injectable()
export class YourService implements OnInit {

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.showGroup('foo');
  }

}
```

Both `name` and `group` are input parameters you can bind to if needed.

```html
<spinner [name]="dynamicSpinnerName" [group]="dynamicGroupName"></spinner>
```

#### show: boolean

By default all spinners are hidden when first registered. You can set a spinner to be visible by default by setting the `show` property to `true`.

```html
<spinner name="mySpinner" [show]="true"></spinner>
```

Note: Don't forget to bind to the `show` parameter if you plan to pass the literal value `true`. If you try doing `show="true"` instead of `[show]="true"` you'll be passing the string value `"true"` rather than the boolean value of `true`.

You can even two-way bind to the `show` property giving you full control over how you show/hide your spinner and what side effects that has in your app.

Example:
```typescript
@Component({
  selector: 'my-component',
  template: `
    <spinner name="mySpinner" [(show)]="spinnerShowing"></spinner>
    <button (click)="spinnerShowing = !spinnerShowing">
      {{spinnerShowing ? 'Hide' : 'Show'}} Spinner
    </button>
  `
})
export class MyComponent {
  spinnerShowing: boolean = false;
}
```

Two-way binding allows changes to `show` to be propagated back to your app allowing you to still use the `SpinnerService` API in conjunction with your own logic and everything will stay in sync.

#### loadingImage: string

Passing in a loading image is the simplest way to create a quick spinner.

```html
<spinner name="mySpinner" loadingImage="/path/to/loading.gif"></spinner>
```

If you want to disable the loading image entirely then simply do not specify the `loadingImage` property and an image won't be used. If you don't include the `loadingImage` option then be sure to specify some custom markup within the spinner directive itself so it can be used instead.

#### Content Projection

If you need more control over the kind of spinner you want to display, beyond just a simple animated image. You are able to supply any custom markup that you need by simply nesting it within the spinner directive. Any content will be projeced into the spinner template below the `loadingImage` if one was specified.

```html
<spinner name="mySpinner">
  <h3>Loading...</h3>
</spinner>
```

Content projection is the most common way to use the `SpinnerComponent` as it allows you to pass in custom markup and use CSS animations instead of an animated .gif image.

---

### Spinner Service

The most common way of interacting with your spinners is via the `spinnerService`. This service can be injected just like any other Angular service. Once you have reference to the service you can take advantage of several methods.

```typescript
import { SpinnerService } from '@chevtek/angular-spinners';

@Injectable()
export class YourService {

  constructor(
    private spinnerService: SpinnerService,
    private http: Http
  ) {}

  loadData(): void {
    this.spinnerService.show('mySpinner');
    this.http
      .get('/some/url/for/data/')
      .toPromise()
      then(res => {
        this.spinnerService.hide('mySpinner');
        // do stuff with res
      })
      .catch(err => {
        this.spinnerService.hide('mySpinner');
        // log error
      })
  }
}
```

#### show(spinnerName: string): void

The `show` method allows you to display a specific spinner by name.

```html
<spinner name="mySpinner" loadingImage="/path/to/loader.gif"></spinner>
```

```typescript
spinnerService.show('mySpinner');
```

#### hide(spinnerName: string): void

Works exactly like `show` but hides the spinner element.

#### showGroup(groupName: string): void

The `showGroup` method allows you to display all spinners with the same group name.

```html
<spinner name="spinner1" group="foo"></spinner>
<spinner name="spinner2" group="foo"></spinner>
<spinner name="spinner3" group="bar"></spinner>
```

```typescript
spinnerService.showGroup('foo');
```

Spinners 1 and 2 would show but spinner 3 would not since it is not part of group "foo".

#### hideGroup(groupName: string): void

Works exactly the same as `showGroup` except it hides the spinners instead.

#### showAll: void

Hopefully it's obvious that this method will show every single spinner registered with the service. This method is rarely used but is there for parity just in case.

#### hideAll(): void

The `hideAll` method is identical to `showAll` except it hides every spinner that is registered. This method also isn't used very often but is extremely useful in global error handlers. We all know how much users ***HATE*** frozen spinners, right?

#### isShowing(spinnerName: string): boolean

The `isShowing` method returns a boolean indicating whether or not the specified spinner is currently showing. You can already two-way bind to the `show` property on the component but rarely you may want to get this information in a distant part of your app without having to manually wire your app to expose it.