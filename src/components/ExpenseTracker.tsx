import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const CategorySchema = z.union([
  z.literal("Groceries"),
  z.literal("House"),
  z.literal("Work"),
]);

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(1, { message: "Amount must be at least 1" }),
  category: CategorySchema,
});
type FormData = z.infer<typeof schema>;

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<FormData[]>([]);
  const {
      register,
      handleSubmit,
      formState: { errors, isValid, isSubmitting },
    } = useForm<FormData>({ resolver: zodResolver(schema) });
    
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        setExpenses([...expenses, data as FormData]);
    };
    const [categoryFilter, setCategoryFilter] = useState("")
    const filteredExpenses = expenses.filter(expense => !categoryFilter || expense.category===categoryFilter);
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="descriptionInput"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}{" "}
          {/* zod makes the errors object more clever and requires only one error p*/}
        </div>
        <div className="mb-3">
          <label htmlFor="amountInput" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amountInput"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="categorySelect"
            className="form-select"
            aria-label="Default select example"
          >
            <option>Groceries</option>
            <option>House</option>
            <option>Work</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <hr />
      <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            id="categoryFilter"
            className="form-select"
            aria-label="Category filter"
          >
            <option value="">All</option>
            <option>Groceries</option>
            <option>House</option>
            <option>Work</option>
          </select>
      <hr/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setExpenses(expenses.filter((item) => item !== expense));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>

          ))}
        <tr key={-1}>
              <td>Total</td>
              <td>${total}</td>
              <td></td>
              <td></td>
            </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTracker;
