import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  documento: yup.string().required("Documento requerido"),
  celular: yup.string().required("Celular requerido"),
});

export default function LoginPage() {
  const { saveToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/login", data);
      alert(res.data.message);
      if (res.data.token) saveToken(res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Documento</label>
          <input {...register("documento")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.documento?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Celular</label>
          <input {...register("celular")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.celular?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}