import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  sessionId: yup.string().required("ID de sesión requerido"),
  token: yup
    .string()
    .length(6, "El token debe tener 6 dígitos")
    .required("Token requerido"),
  valor: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor que cero")
    .required("Valor requerido"),
});

export default function ConfirmPage() {
  const { token: jwt } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/wallet/confirm", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error al confirmar la compra");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Confirmar Compra</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ID de Sesión</label>
          <input {...register("sessionId")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.sessionId?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Token (6 dígitos)</label>
          <input {...register("token")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.token?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Valor de la compra</label>
          <input
            type="number"
            {...register("valor")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.valor?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}