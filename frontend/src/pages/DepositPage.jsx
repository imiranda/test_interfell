import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  documento: yup.string().required("Documento requerido"),
  celular: yup.string().required("Celular requerido"),
  valor: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor que cero")
    .required("Valor requerido"),
});

export default function DepositPage() {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/wallet/deposit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error al recargar billetera");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Recargar Billetera</h2>
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
        <div>
          <label className="block text-sm font-medium">Valor</label>
          <input
            type="number"
            {...register("valor")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.valor?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Recargar
        </button>
      </form>
    </div>
  );
}