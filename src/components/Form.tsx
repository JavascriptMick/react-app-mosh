import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//div.mb-3>label.form-label+input.form-control

// Use Zod to define a validation schema including types, limits, custom messages and custom messages for special cases (smart)
const schema = z.object({
  name: z.string().min(3, {message: 'Name must be at least 3 characters'}),
  age: z.number({invalid_type_error: 'Age field is required'}).min(18, {message: 'Age must be at least 18'}),
});

// create a type based on the schema
type FormData = z.infer<typeof schema>;

const Form = () => {
  // leverage useForm Hook typed to the FormData type and specify the zodResolver with the special schema
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  interface Person {
    name: string;
    age?: number;
  }
  // ref Hook approach
  // const nameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);
  // const person = {
  //   name: '',
  //   age: 0,
  // }

  // 'controled form' or useState approach - note component is rerenered on each keypressin input fields
  let [person, setPerson] = useState<Person>({
    name: "",
  });

  // const handleSubmit = (event: FormEvent)=> {
  //   event.preventDefault();

  //   // Ref hook approach, you need to pull the values out of the dom via the ref
  //   // if(nameRef.current){
  //   //   person.name = nameRef.current.value;
  //   // }
  //   // if(ageRef.current){
  //   //   person.age = parseInt(ageRef.current.value);
  //   // }

  //   console.log(person); //control form approach, the person is already setup by the onChange events
  // }
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        {/* <input ref={nameRef} id="nameInput" type="text" className="form-control" /> // simple ref approach.. use ref on submit to pull value*/}
        {/* <input value={person.name} onChange={(event) => setPerson({...person, name:event.target.value})} id="nameInput" type="text" className="form-control" /> // control form approach where you use a useState object and slave the value to the input with value and onchange*/}
        {/* <input
          {...register("name", { required: true, minLength: 3 })}
          id="nameInput"
          type="text"
          className="form-control"
        /> // leverage the useForm hook from react-hook-form to automate the use of ref*/}
        <input
          {...register("name")}
          id="nameInput"
          type="text"
          className="form-control"
        /> {/* sophisticated use of useForm hook and a zod resolver for clever validation logic*/}
        {/* {errors.name?.type === "required" && (
          <p className="text-danger">Required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">Min Length = 3</p>
        )} // error messages using the useForm hook errors object*/}
        {errors.name && <p className="text-danger">{errors.name.message}</p>} {/* zod makes the errors object more clever and requires only one error p*/}
      </div>
      <div className="mb-3">
        <label htmlFor="ageInput" className="form-label">
          Age
        </label>
        {/* <input ref={ageRef} id="ageInput" type="number" className="form-control" /> */}
        {/* <input value={person.age} onChange={(event) => setPerson({...person, age:parseInt(event.target.value)})} id="ageInput" type="number" className="form-control" /> */}
        <input
          {...register("age", {valueAsNumber: true})}
          id="ageInput"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button disabled={!isValid || isSubmitting} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
