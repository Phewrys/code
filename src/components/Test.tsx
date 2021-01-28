import { TestStyled } from './../content/styles/Styled'
import { useEffect, FormEvent, useState } from 'react'
import apiJSONPlaceholder from './../services/apiJSONPlaceholder'
import apiFlex from './../services/apiFlex'

interface JSONPlaceholder {
    id: number;
    name: string;
    username: string;
}

interface Flex {
    _id: string;
    idUsuario: number;
    motivo: string;
    valor: number;
    criado: Date;
}

export default function Test() {
    const [placeholders, setPlaceholder] = useState<JSONPlaceholder[]>([]);
    const [flexsAll, setFlexAll] = useState<Flex[]>([]);

    let [cliente, setCliente] = useState('')
    let [motivo, setMotivo] = useState('')
    let [valor, setValor] = useState('')

    let [idPut, setIdPut] = useState('')
    let [idUsuarioPut, setIdUsuarioPut] = useState('')
    let [nomePut, setNomePut] = useState('')
    let [motivoPut, setMotivoPut] = useState('')
    let [valorPut, setValorPut] = useState('')

    // GET ALL - JSONPlaceholder 
    useEffect(() => {
        apiJSONPlaceholder.get(`users`).then(response => {
            setPlaceholder(response.data);
        })
    }, []);

    // OBTER TODOS - GET
    async function handleGet(event: FormEvent) {
        event.preventDefault();

        fetch('https://provadev.xlab.digital/api/v1/divida?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5')
            .then((response) => response.json())
            .then((json) => setFlexAll(json.result));
    };

    // CADASTRAR - POST
    async function handlePost(event: FormEvent) {
        event.preventDefault();

        fetch('https://provadev.xlab.digital/api/v1/divida?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5', {
            method: 'POST',
            body: JSON.stringify({
                idUsuario: cliente,
                motivo: motivo,
                valor: valor,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    };

    // ALTERAR - GET/:id
    function handlePutId(id: string) {
        apiFlex.get(`divida/${id}?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`).then(response => {
            setIdUsuarioPut(response.data.result.idUsuario)
            setMotivoPut(response.data.result.motivo)
            setValorPut(response.data.result.valor)
        })

        setIdPut(id)
    }

    // ALTERAR - PUT
    async function handlePut(event: FormEvent) {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idUsuario: idUsuarioPut,
                motivo: motivoPut,
                valor: valorPut,
            })
        };

        fetch(`https://provadev.xlab.digital/api/v1/divida/${idPut}?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`, requestOptions)
            .then(response => response.json())
    };

    // DELETAR - DELETE/:id
    async function handleDelete(id: string) {

        fetch(`https://provadev.xlab.digital/api/v1/divida/${id}?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`, {
            method: 'DELETE',
        });
    }

    return (
        <TestStyled>
            <div style={{ fontSize: '70px' }}><strong>code<span>7</span></strong></div>
            <div className="container shadow" style={{ width: '900px' }}>
                <div className="row justify-content-start">
                    <div className="col-3">
                        <div className="row justify-content-center">
                            {flexs.map(flex => {
                                return (
                                    <div className="col-12 shadow m-2" style={{ width: '500px' }}>{flex.idUsuario}</div>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className="col-7 m-2">
                        <div className="shadow row justify-content-end">
                            <div className="col-12">
                                <div className="container">
                                    <form onSubmit={handleSubmit} >
                                        <div className="form-group text-left">
                                            <label htmlFor="idCliente">Cliente</label>
                                            <select className="form-control" id="idCliente" onChange={e => setCliente(e.target.value)} required>
                                                <option selected>-- Selecionar --</option>
                                                {placeholders.map(placeholder => {
                                                    return (
                                                        <option value={`${placeholder.id}`}>{placeholder.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group text-left">
                                            <label htmlFor="idMotivo">Motivo</label>
                                            <input type="text" className="form-control" id="idMotivo" placeholder="Ex: dívida cartão de crédito" onChange={e => setMotivo(e.target.value)} required />
                                        </div>
                                        <div className="form-group text-left w-50">
                                            <label htmlFor="idValor">Valor</label>
                                            <input type="number" className="form-control" id="idValor" placeholder="Ex: R$ 500,00" onChange={e => setValor(e.target.value)} required />
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-3">
                                                <button type="reset" className="btn btn-light mb-2"><strong>Excluir</strong></button>
                                            </div>
                                            <div className="col-3">
                                                <button type="submit" className="btn btn-light mb-2"><strong>Salvar</strong></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 offset-md-9">
                        <button type="reset" className="btn btn-light btn-lg mb-2 px-4"><strong>NOVO</strong></button>
                    </div>
                </div>
            </div>
        </TestStyled>
    )
}