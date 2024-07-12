# Release notes

The document purpose to show what needs to be followed up when migrating
a project to the given ui-core version. (Change in the project)

**10.3.24**
- Removed filterJewelers function from JewelerFinderService. pagination.refresh should be called directly.

**10.2.49**
- Remove quill dependency from package.json if there is any.
- Remove quill path from angular.json's scripts paths if there is any.

**10.2.35**
- From now on the `serveUi` function should be used  in run.js file
- From now on the following `Dockerfile` structure should be used

```text
FROM node:10-alpine

RUN mkdir "/opt/app"

COPY dist /opt/app/dist
COPY run.js /opt/app/run.js
COPY node_modules /opt/app/node_modules

WORKDIR /opt/app
RUN chmod u+x run.js

EXPOSE 80

ENTRYPOINT ["node", "./run.js"]

```
- Examples can be found in `okgy-ui` project.
- SRR instructions will also be available in the same project on the commit with message `SSR implementation`.
- Removed HmrService and IHmrComponent so check usages needed.
- `SliderNumberRenderer` and `SliderSegmentRenderer` constructors are refactored, so check needed.

**10.2.33**
- ConfigService is now only available as IConfigService in some places, so you need to check because it has less properties in public.

**10.2.30**
- StateService is not available on DebugService anymore. Need to be injected separately.
- Check the api.list calls, because list does not pluralize the endpoints from now.

**10.0.0**
- Check `flip` property on dropdowns, it is removed.
- Check file paths in scss files. Sass now uses relative paths from the actual files, not the root one.
- Check private `subscription`: Subscription property in some components, because they are now defined in parent components.
- use `inject`: false instead of `lazy`: true in angular.json
- Check StateService usages. `StateService` needs to be injected individually, it is not available from debug service anymore.
- Check `ngx-bootstrap` module usages. We need to use submodules
- Check AuthGuard subclasses for ex.: `SummaryService`. AuthGuard needs StateService in constructor instead of Router.
- Remove unnecessary hmr bootstrap from main.ts

**4.9.6**
- CSS: Toggle checkbox add extra
- Scripts: Toggle disabled view encapsulation (check css overrides)

**4.10.6**
- Set embed3D height to container width, if container height is larger than it's width or it is approximately zero.

**4.10.7**
- Set embed3D height to container width also if the container width is equal or bigger than the specified squareFrom parameter.

**4.10.8**
- Revert squareFrom feature.

**4.11.1**
- ParseNumberOptionsPipe now support function as the format.
- formatSliderWidth, formatSliderPosition, formatStoneSliderPosition are removed from FormatterService. 
- use formatSliderNumber instead. Please check how the pipe works to format properly.
- formatNumber, roundNumber default values are replaced to 1.

**4.12.0**
- Refactored price service to support more rings.
- Refactored price pipe to support this.
- Size pipe refactored and renamed to formatNumber pipe. 
  - old params: value, unit, divider, precision  ex.: size:num:'mm':100:1
  - new params: value, precision, divider, format  ex.: formatNumber:num:1:100:'[value]mm'

**4.12.4**
- ExtraItemPropertiesPipe now passes a new object with item, index, params properties as the context not just the item.
- FilterPipe now works similar to ExtraItemPropertiesPipe, filter can be a function or a string which will be evaluated.
- Before FilterPipe's filter was an object which keys, were the items keys, and values were the values to be compared with items properties.
- Slider component segments image property renamed to background.
- Fixed the issue creator error handler tool.

**4.13.0**
- Refactored DynamicFormComponent. There are no steps anymore. No need to declare steps when injecting the component to the template.
- Models needs to be refactored, to remove steps definitions from steps property, validators, etc.
- Multi featured models needs to be splitted to multiple models, for ex. ProfileModel, UserModel.
- Components needs to be refactored when calling validate, there is no more need to specify the validated steps.
- Validate functions Promise will be rejected on validation failure.
Refactored DynamicFormComponent. There are no steps anymore. No need to declare steps when injecting the component to the template.
- Models needs to be refactored, to remove steps definitions from steps property, validators, etc.
- Multi featured models needs to be splitted to multiple models, for ex. ProfileModel, UserModel.
- Components needs to be refactored when calling validate, there is no more need to specify the validated steps.
- Validate functions Promise will be rejected on validation failure.

**4.13.3**
- BaseStepComponent is refactored, and every service that is needed for a configurator step is already injected, 
  and there is no need to override the constructor anymore. You can override the ctrInit function or implement the 
  OnInit angular interface to define the property values that were defined in the constructor.
- BaseStepPanelComponent now asks for inject the BaseContainerComponent which is an abstract class and ContainerComponent inherits from it.
- So you need to define the ConfiguratorComponent or ModificatorComponent like this:

@Component({

    moduleId: module.id,   
    selector: "configurator",    
    templateUrl: "./configurator.component.html",
    providers: [
        {provide: ContainerComponent, useExisting: ConfiguratorComponent},
        {provide: BaseContainerComponent, useExisting: ConfiguratorComponent}
    ]
})

export class ConfiguratorComponent extends ContainerComponent

**4.13.11**
- The icon and title properties are removed from IFormBasicData interface. 
- The first one is not used anywhere. The second is customizable by the new @FormFieldSet decorator, which is applicable on the models class.

**4.13.12**
- Update ngx-popper to "^2.3.1" in the project.

**5.1.8**
- Service breaking changes, for mock api reasons. Please ask stemy..


**5.1.17**
- Added DebugBarComponent with json price debug feature.
- You need to include ngx-json-view in paths variable of tsconfig.json because of that.
- ... "ngx-json-view": ["node_modules/ngx-json-view"], ...

**5.2.0**
- Breaking changes in parseNumberOptions and formatNumber pipes, so you need to recheck all of them before using this version.
- This is because backward compatibility with old APIs

**6.0.2**
- Removed css from dropdown arrow, use icon instead.

**6.2.21**
- Updated @stemy/ngx-utils 2.2.1
- Updated ngx-json-viewer 2.3.0

**7.2.15**
- Reject when loading snapshot in IntegrationService instead of loading a new container

**7.2.21**
- Removed ISnapshotRing interface, use ISaveLoadRing instead
- Removed default initialization from FavoritesService please call the init function when it's first needed
- Added more guards for routes
- Added checkProjects to FormUtils

**7.2.22**
- Fixed popper.js versions..

**7.2.26**
- Removed icons tool. Use the sprites builder instead in angular.json
- The custom schema for sprites is the following: 
```
    customSchema.properties.sprites = {
        type: "array",
        description: "List of applications sprites.",
        default: [],
        items: {
            $ref: "#/definitions/sprite"
        }
    };
    customSchema.definitions.sprite = {
        type: "object",
        properties: {
            input: {
                type: "string",
                description: "The input folder of SVG files"
            },
            output: {
                type: "string",
                description: "The output path of the generated sprite SVG"
            },
            skip: {
                description: "List of skipped items change to currentColor.",
                default: false,
                oneOf: [
                    {
                        type: "array",
                        items: {
                            $ref: "#/definitions/spriteSkip"
                        }
                    },
                    {
                        type: "boolean"
                    }
                ]
            }
        }
    };
    customSchema.definitions.spriteSkip = {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "Skip this symbol id"
            },
            color: {
                type: "string",
                description: "Skip this symbol color"
            },
            fill: {
                type: "boolean",
                default: false,
                description: "Skip fill change to currentColor"
            },
            stroke: {
                type: "boolean",
                default: false,
                description: "Skip stroke change to currentColor"
            }
        }
    };
```

**7.2.31**
- Updated ngx-utils to 2.8.6
- Support simple catch in http request.
- Added aliases support for SVG sprites, where the json schema is:

```
aliases: {
    type: "object",
    description: "Mapping for symbol aliases, where the key is the target symbol and the value is an array of aliases for it.",
    default: {},
    additionalProperties: {
        type: "array",
        items: {
            type: "string"
        }
    }
}

```

**7.2.34**
- `box-group` media queries removed, handled by project
-  add `size-xs` mixin

**7.3.0**
- Removed horizontal slider completely
- Use normal slider instead with renderer functions.
- Override and use renderHorizontalSlider and renderFreeSlider functions in FormatterService. (Because its injected in step components)

**7.3.1**
- Added renderCutSlider function to FormatterService. Please use that too.

**7.3.2**
- Added utils for slider rendering.
- Added renderFreeStoneSlider function to FormatterService. Please use that too.

**7.3.7**
- Added SliderSeparationRenderer
- Added renderSeparationSlider function to FormatterService. Please use that too.
- Fixed text based slider renderer-s font loading.

**7.3.61**
- Added ComponentSubscriber class decorator
- Usage:

```

@ComponentSubscriber<ConfiguratorComponent>(
    {
        getEvents: c => [c.events.containerUpdated],
        cb: c => {
            console.log("TADAA ONE EVENT")
        }
    },
    {
      getEvents: c => [c.events.containerUpdated, c.events.ringModeUpdated],
      cb: c => {
          console.log("TADAA MULTIPLE EVENTS")
      }
  }
)
class ConfiguratorComponent {
   events: CoreEventsService;
}

```

**7.3.62**
- Update ngx-dynamic-form to v2.8.2 so model can be used in label translations and sub model readonly works.

**7.4.0**
- Removed the slider view div element and its calculation. Use renderer instead to draw the view circle.

**7.4.35**
- You should remove the accordion wrapper in configurator/modificator components.
