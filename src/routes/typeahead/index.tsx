import { component$, $ } from '@builder.io/qwik';
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';
import countries from '../../data/countries';

export const useCountriesLoader = routeLoader$(async ({ query }) => {
  // Add some slowness
  await new Promise((r) => setTimeout(r, 200));

  return Object.values(countries)
    .filter((country) =>
      country.name
        .toLowerCase()
        .includes(query.get('query')?.toLowerCase() || '')
    )
    .slice(0, 10);
});
/*
Issues with this:
1. Previous Loader calls do not get cancelled. Does it handle race issues?
2. The url is not updated
3. How could we show something while it's loading?
*/

export default component$(() => {
  const loadedCountries = useCountriesLoader();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        Ideally we would be able to leverage the forms to get the search in the
        url. It seems that navigate doesn't update the url.. Loader requests are
        not cancelled!
      </div>
      <h2> Let's search countries: </h2>
      <input
        type="text"
        onInput$={(e) => navigate('./?query=' + e?.target?.value)}
      ></input>

      <ul>
        {loadedCountries.value.map((country) => (
          <li> {country.name} </li>
        ))}
      </ul>
    </div>
  );
});
