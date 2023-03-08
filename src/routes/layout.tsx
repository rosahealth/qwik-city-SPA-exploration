import { component$, Slot } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <>
      <h2>
        {' '}
        This is a shared layout (<Link href="/">Home</Link>)
      </h2>
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
          <div>{serverTime.value.date}</div>
        </a>
      </footer>
    </>
  );
});
