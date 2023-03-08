import { component$ } from '@builder.io/qwik';
import {
  DocumentHead,
  Form,
  globalAction$,
  useNavigate,
} from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export const TODO_LIST_ROUTE = '/todolist';

export const useWorkAndRedirectToTodoListAction = globalAction$(
  (_data, { redirect }) => {
    // DO some work
    console.log('useWorkAndRedirectToTodoListAction');
    throw redirect(303, TODO_LIST_ROUTE);
  },
  {id: 'workAndRedirectToTodoListAction'}
);

export const useWorkAction = globalAction$((_data) => {
  // DO some work
  console.log('workAction')
  return 'Success';
}, {
  id: 'workAction',
});

export default component$(() => {
  const navigate = useNavigate();

  const workAction = useWorkAction();
  const workAndRedirectToTodoListAction = useWorkAndRedirectToTodoListAction();

  return (
    <div>
      <h3>
        You can try{' '}
        <Link href="/typeahead">
          using the loader to do a search/typeahead{' '}
        </Link>
      </h3>
      <h3>Go to TODO list</h3>

      <h4>Using a Link (Not changing the url...)</h4>
      <Link href={TODO_LIST_ROUTE}> TODO list</Link>

      <h4> Go to TODO list: using Navigate on button click </h4>
      <button onClick$={() => navigate(TODO_LIST_ROUTE)}>
        Use Navigate to go to the todo list
      </button>

      <h4>Using useNavigate on anchor click (Not changing the url...) </h4>
      <p>
        According to the doc, it should be equivalent to a Link{' '}
        <a href="https://qwik.builder.io/qwikcity/api/#link">
          Qwik City Link Doc
        </a>
      </p>
      <a
        href={TODO_LIST_ROUTE}
        onClick$={() => navigate(TODO_LIST_ROUTE)}
        preventdefault:click
      >
        Use Navigate to go to the todo list
      </a>

      <h3>
        The following ways to go to TODO list{' '}
        <bold>don't work in stack blitz because of CSRF (wrong origin?)</bold>
      </h3>
      <h4> Using a redirect action (full page reload) </h4>
      <Form action={workAndRedirectToTodoListAction}>
        <button type="submit"> Submit form and go to todo list</button>
      </Form>

      <h4>
        Using navigate on form completion (not a full page reload but it won't
        work without JS)
      </h4>
      <Form
        action={workAction}
        onSubmitCompleted$={() => navigate(TODO_LIST_ROUTE)}
      >
        <button type="submit"> Submit form and go to todo list</button>
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
