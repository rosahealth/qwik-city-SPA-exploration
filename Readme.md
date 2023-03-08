# Playing with Qwik City loaders, actions and Link

## How to start?
- `npm run dev`

## Current issues

### Loaders
- The previous loader calls don't get cancelled.
- How can we know when it's loading? Could we update our component to show a loader?
### Actions
The `routeAction$` from the Qwik city starter doesn't work but `globalAction$` does.

### Stackblitz
It doesn't work well in stackblitz( [this repo in stackblitz](https://stackblitz.com/github/rosahealth/qwik-city-SPA-exploration?file=package.json))

- `routeActions$ lead to CSRF errors.
- `useNavigate` and `Link` do not change the url.