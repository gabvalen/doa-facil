import * as React from 'react'   
import { AuthContext } from '../contexts/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { toast } from 'react-toastify'


export function useUser(){

    const { user } = React.useContext(AuthContext)
    const queryClient = useQueryClient()
   
    const regionOptions = [ {
        value: 'AC',
        label: 'Acre'
    }, {
        value: 'AL',
        label: 'Alagoas'
    }, {
        value: 'AP',
        label: 'Amapá'
    }, {
        value: 'AM',
        label: 'Amazonas'
    }, {
        value: 'BA',
        label: 'Bahia'
    }, {
        value: 'CE',
        label: 'Ceará'
    }, {
        value: 'DF',
        label: 'Distrito Federal'
    }, {
        value: 'ES',
        label: 'Espírito Santo'
    }, {
        value: 'GO',
        label: 'Goiás'
    }, {
        value: 'MA',
        label: 'Maranhão'
    }, {
        value: 'MT',
        label: 'Mato Grosso'
    }, {
        value: 'MS',
        label: 'Mato Grosso do Sul'
    }, {
        value: 'MG',
        label: 'Minas Gerais'
    }, {
        value: 'PA',
        label: 'Pará'
    }, {
        value: 'PB',
        label: 'Paraíba'
    }, {
        value: 'PR',
        label: 'Paraná'
    }, {
        value: 'PE',
        label: 'Pernambuco'
    }, {
        value: 'PI',
        label: 'Piuaí'
    }, {
        value: 'RJ',
        label: 'Rio de Janeiro'
    }, {
        value: 'RN',
        label: 'Rio Grande do Norte'
    }, {
        value: 'RS',
        label: 'Rio Grande do Sul'
    }, {
        value: 'RO',
        label: 'Rondônia'
    }, {
        value: 'RR',
        label: 'Roraima'
    }, {
        value: 'SC',
        label: 'Santa Catarina'
    }, {
        value: 'SP',
        label: 'São Paulo'
    }, {
        value: 'SE',
        label: 'Sergipe'
    }, {
        value: 'TO',
        label: 'Tocantins'
    }]

    const { data, isLoading } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
          try {
            const response = await api.get(`/user/${user}`)
            return response.data
          } catch(err){
            console.error(err)
            return err.response.data
          }
        },
      })


    const updateUserMutation = useMutation({
        mutationFn: async (user) => {
        const { nomeCompleto, telefone, email, CEP, estado, rua, cidade } = user

          try {
            const response = await api.put(`/user/${user.id}`, {
                nomeCompleto,
                telefone,
                email,
                CEP,
                estado,
                rua,
                cidade,
            })
            return response.data
          } catch(err){
            console.error(err)
            return err.response.data
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries('userData')
          toast.success('Usuário atualizado com sucesso', {
            position: 'top-right',
          })
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            position: 'top-right',
          })
        },
    })

      const handleUserUpdate = async (user) => {
        updateUserMutation.mutate(user)
      }

    return { regionOptions, data, isLoading, handleUserUpdate, user }
}