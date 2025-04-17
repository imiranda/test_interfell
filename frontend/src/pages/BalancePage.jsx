import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  documento: yup.string().required("Documento requerido"),
  celular: yup.string().required("Celular requerido"),
});

export default function BalancePage() {
  const { token } = useAuth();
  const [saldo, setSaldo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ documento, celular }) => {
    try {
      const res = await axios.get("/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          documento,
          celular,
        },
      });
      setSaldo(res.data.saldo);
    } catch (err) {
      alert(err.response?.data?.message || "Error al consultar saldo");
      setSaldo(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Consultar Saldo</h2>
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
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 w-full"
        >
          Consultar Saldo
        </button>
      </form>

      {saldo !== null && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded text-center">
          <p className="text-lg font-semibold text-green-800">
            Saldo actual: ${saldo}
          </p>
        </div>
      )}
    </div>
  );
}