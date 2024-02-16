import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useCreateUserMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";

function Register() {
  const dispatch = useAppDispatch();
  interface IFormData {
    name: string;
    email: string;
    password: string;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormData>();
  const [createUser, { error }] = useCreateUserMutation();
  console.log(error);
  const navigate = useNavigate();

  const handleSignUp = async (data: IFormData) => {
    console.log(data);
    const userData = {
      username: data.name,
      email: data.email,
      password: data.password,
    };

    const res = await createUser(userData).unwrap();
    const user = verifyToken(res.data.token);

    dispatch(setUser({ user: user, token: res.data.token }));
    toast.success("Registration successfully");
    reset();
    navigate("/");
  };
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-4xl text-center font-bold">SignUp</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name Address is required" })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password Address is required",
                  minLength: {
                    value: 6,
                    message: "password must be 6 characters",
                  },
                })}
                className="input input-bordered w-full max-w-xs "
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>

            <input
              className="btn btn-accent text-xl w-full mt-5"
              value="Sign Up"
              type="submit"
            />
          </form>
          <p>
            Already have an account{" "}
            <Link className="text-secondary mt-5" to={"/login"}>
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
