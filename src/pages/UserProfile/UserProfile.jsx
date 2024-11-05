import React, { useContext } from "react";
import Sidebar from "./components/Sidebar.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { SectionHeader } from "../HomePage/components/SectionHeader.jsx";
import { Separator } from "../../components/Separator.jsx";
import { useUser } from "../../hooks/useUser.js";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DonationUserItemDoados from "./components/DonationUserItemDoado.jsx";
import DonationUserItemRecebidos from "./components/DonationUserItemRecebidos.jsx";
import DonationUserItemFavorite from "./components/DonationUserItemFavorite.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const UserProfileSchema = z.object({
  nome: z.string(),
  email: z.string(),
  phone: z.string(),
  logradouro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  cep: z.string(),
});

export const UserProfile = () => {
  const { data, isLoading, handleUserUpdate, regionOptions } = useUser();

  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset, } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      nome: data?.user?.nomeCompleto,
      email: data?.user?.email,
      phone: data?.user?.telefone,
      logradouro: data?.user?.rua,
      cidade: data?.user?.cidade,
      estado: data?.estado,
      cep: data?.user?.CEP,
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        nome: data?.user?.nomeCompleto,
        email: data?.user?.email,
        phone: data?.user?.telefone,
        logradouro: data?.user?.rua,
        cidade: data?.user?.cidade,
        estado: regionOptions.find((region) => region.value === data?.user.estado)?.value,
        cep: data?.user?.CEP,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const submitForm = async (data) => {

    const { nome, email, phone, logradouro, cidade, estado, cep } = data;

    const formattedData = {
      nomeCompleto: nome,
      email,
      telefone: phone,
      rua: logradouro,
      cidade,
      estado,
      CEP: cep,
      id: user,
    }

    handleUserUpdate(formattedData);
  }


  return (
    <>
      {isLoading ? (
        <span>Carregando...</span>
      ) : (
        <div className="min-h-screen flex flex-col">
          {/* Container flex para Sidebar e Conteúdo Principal */}
          <div className="flex flex-1">
            {/* Sidebar para telas grandes */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>

            {/* Área do conteúdo principal */}
            <div className="flex-1 flex flex-col">
              {/* Header para telas pequenas */}
              <div className="md:hidden">
                <MobileHeader />
              </div>

              {/* Main Content */}
              <main className="flex-1 bg-gray-100 p-10">
                {/* Seção de Informações do Usuário */}
                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="flex-1 bg-white p-8 rounded shadow-md w-full max-w-3xl mx-auto"
                >
                  {/* Informações do Usuário */}
                  <div className="flex flex-col sm:flex-row items-center mb-6">
                    {/* Foto de Perfil */}
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0">
                      <img
                        src="/avatardayelle.png"
                        alt="Foto de Perfil"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    {/* Nome */}
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 w-full">
                      <label className="block text-gray-700">
                        Nome
                        <input
                          type="text"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("nome")}
                        />
                      </label>
                    </div>
                  </div>
                  {/* Linha: Email e Telefone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700">
                        Email
                        <input
                          type="email"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("email")}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Telefone
                        <input
                          type="tel"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("phone")}
                        />
                      </label>
                    </div>
                  </div>
                  {/* Linha: Endereço e Cidade */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700">
                        Endereço
                        <input
                          type="text"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("logradouro")}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Cidade
                        <input
                          type="text"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("cidade")}
                        />
                      </label>
                    </div>
                  </div>
                  {/* Linha: CEP, UF e Botão */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-gray-700">
                        CEP
                        <input
                          type="text"
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("cep")}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        UF
                 
                          <select
                          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
                          {...register("estado")}
                        >
                          {regionOptions.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                        </select>
                                
                         
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-azul-claro text-white py-2 px-4 rounded-md hover:bg-azul-médio"
                      >
                        Editar Minhas Informações
                      </button>
                    </div>
                  </div>
                </form>

                {/* Separador Opcional */}
                <Separator className="my-8 h-0.5 bg-gray-200" />

                {/* Minhas Doações */}
                <section className="mt-12 mb-8">
                  <SectionHeader label="Minhas Doações" title="Histórico"/>
                  <DonationUserItemDoados />
                </section>

                <Separator className="my-8 h-0.5 bg-gray-200" />

                {/* Favoritos */}
                <section className="mt-12 mb-8" id="favoritos">
                  <SectionHeader label="Favoritos" title="Itens Favoritos" />
                  <DonationUserItemFavorite />
                </section>

                <Separator className="my-8 h-0.5 bg-gray-200" />

                {/* Itens Recebidos */}
                <section className="mt-12 mb-8">
                  <SectionHeader
                    label="Itens Recebidos"
                    title="Itens Recebidos"
                  />
                  <DonationUserItemRecebidos />
                </section>

                
              </main>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
