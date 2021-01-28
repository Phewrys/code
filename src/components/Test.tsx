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
    idUsuario: number;
    motivo: string;
    valor: number;
    criado: Date;
}

export default function Test() {

    const [placeholders, setPlaceholder] = useState<JSONPlaceholder[]>([]);
    const [flexs, setFlex] = useState<Flex[]>([]);
    let [cliente, setCliente] = useState('')
    let [motivo, setMotivo] = useState('')
    let [valor, setValor] = useState('')

    // GET - JSONPlaceholder 
    useEffect(() => {
        apiJSONPlaceholder.get(`users`).then(response => {
            setPlaceholder(response.data);
        })
    }, []);

    // GET - FLEX
    useEffect(() => {
        apiFlex.get(`divida?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`).then(response => {
            setFlex(response.data.result);
        })
    }, []);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        // POST - FLEX
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
        });

    };

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