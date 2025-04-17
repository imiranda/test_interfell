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

export default function PurchasePage() {
  const { token } = useAuth();
  const [sessionId, setSessionId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/wallet/purchase", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
      setSessionId(res.data.sessionId);
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar compra");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Iniciar Compra</h2>
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
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full"
        >
          Enviar Código de Compra
        </button>
      </form>

      {sessionId && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <p className="text-sm text-gray-800">
            Se ha enviado un código a tu correo.
          </p>
          <p className="mt-2 font-semibold">🆔 ID de sesión:</p>
          <code className="text-xs break-all text-blue-600">{sessionId}</code>
        </div>
      )}
    </div>
  );
}