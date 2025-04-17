import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  documento: yup.string().required("Documento requerido"),
  nombres: yup.string().required("Nombres requeridos"),
  email: yup.string().email("Email inválido").required("Email requerido"),
  celular: yup.string().required("Celular requerido"),
});

export default function RegisterPage() {
  const { saveToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/register", data);
      alert(res.data.message);
      if (res.data.token) saveToken(res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Error registrando usuario");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Registro de Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Documento</label>
          <input {...register("documento")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.documento?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Nombres</label>
          <input {...register("nombres")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.nombres?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Celular</label>
          <input {...register("celular")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.celular?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}