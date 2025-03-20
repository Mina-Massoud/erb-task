import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoSchema = Yup.object().shape({
  todoText: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
});

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  return (
    <div className="mb-8">
      <Formik
        initialValues={{ todoText: '' }}
        validationSchema={TodoSchema}
        onSubmit={(values, { resetForm }) => {
          onAddTodo(values.todoText);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Field
                type="text"
                name="todoText"
                placeholder="Add a new todo..."
                autoComplete="off"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
              />
              <ErrorMessage name="todoText" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              Add Todo
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm; 