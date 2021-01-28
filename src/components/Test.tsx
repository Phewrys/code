import { TestStyled } from './../content/styles/Styled'
import { useEffect, FormEvent, useState } from 'react'
import apiJSONPlaceholder from './../services/apiJSONPlaceholder'
import apiFlex from './../services/apiFlex'
import { Table, Modal } from 'react-bootstrap'
import Moment from 'moment'
import { BsPencil } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import swal from 'sweetalert'

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
    const [modalDefault, setModalDefaultShow] = useState(false);
    const modalDefaultClose = () => setModalDefaultShow(false);
    const modalDefaultShow = () => setModalDefaultShow(true);

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

    let [idGet, setIdGet] = useState(0)

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

        var x = parseInt(cliente)
        setIdGet(x)
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
        }).then(() => swal({
            title: "Cadastrado com Sucesso!!!",
            icon: "success",
            buttons: [false],
            timer: 2000,
        }))
        
    };

    // ALTERAR - GET/:id
    function handlePutId(id: string) {
        apiFlex.get(`divida/${id}?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`).then(response => {
            setIdUsuarioPut(response.data.result.idUsuario)
            setMotivoPut(response.data.result.motivo)
            setValorPut(response.data.result.valor)
        })

        setIdPut(id)
        modalDefaultShow()
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
            .then(() => swal({
                title: "Alterado com Sucesso!!!",
                icon: "success",
                buttons: [false],
                timer: 2000,
            }))

        modalDefaultClose()
    };

    // DELETAR - DELETE/:id
    async function handleDelete(id: string) {
        swal({
            title: "Tem certeza?",
            text: "Uma vez excluído, você não será capaz de recuperar este arquivo!",
            icon: "warning",
            buttons: ["Cancelar", true],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`https://provadev.xlab.digital/api/v1/divida/${id}?uuid=8d7297ad-3caa-4bab-9e16-99653958fac5`, {
                    method: 'DELETE',
                });
                swal({
                    title: "Excluído com Sucesso!!!",
                    icon: "success",
                    buttons: [false],
                    timer: 2000,
                });
            } else {

            }
        })
    }
    
    return (
        <TestStyled>
            <div className="py-5">
                <div style={{ fontSize: '70px' }}><strong>code<span>7</span></strong></div>
                <div className="container shadow" style={{ width: '90vw', minWidth: '300px', padding: '30px' }}>
                    <div className="row justify-content-center">
                        <form onSubmit={handlePost} style={{ width: '100vw', maxWidth: '1000px' }}>
                            <p className="text-left pt-2"><h1><strong>Cadastrar Dívida</strong></h1></p>
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
                            <hr />
                            <div className="form-group row justify-content-center">
                                <button type="submit" className="btn btn-green m-2" style={{ width: '100px' }}><strong>Salvar</strong></button>
                                <button type="reset" className="btn btn-red m-2" style={{ width: '100px' }}><strong>Cancelar</strong></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container shadow mt-3" style={{ width: '90vw', minWidth: '300px', padding: '30px' }}>
                    <div className="row justify-content-center">
                        <form onSubmit={handleGet} style={{ width: '100vw', maxWidth: '1000px' }}>
                            <p className="text-left pt-2"><h1><strong>Lista de Devedores</strong></h1></p>
                            <div className="form-group text-left">
                                <label htmlFor="idCliente">Cliente</label>
                                <select className="form-control" id="idCliente" onChange={e => setCliente(e.target.value)} required>
                                    <option selected> -- Selecionar -- </option>
                                    {placeholders.map(placeholder => {
                                        return (
                                            <option onChange={() => setIdGet(placeholder.id)} value={`${placeholder.id}`}>{placeholder.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <hr />
                            <div className="form-group row justify-content-center">
                                <button type="submit" className="btn btn-green m-2" style={{ width: '100px' }}><strong>Consultar</strong></button>
                                <button type="reset" className="btn btn-red m-2" style={{ width: '100px' }}><strong>Cancelar</strong></button>
                            </div>
                        </form>

                        <div className="container pt-4">
                            <Table striped bordered hover size="sm" variant="dark" responsive>
                                <thead>
                                    <tr>
                                        <th><h3>AÇÕES</h3></th>
                                        <th><h3>VALOR</h3></th>
                                        <th><h3>MOTIVO</h3></th>
                                        <th><h3>DATA</h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flexsAll.map(flex => {
                                        return (
                                            <>{idGet === flex.idUsuario ?
                                            <>{placeholders.map(x => {
                                                return (
                                                    <>{idGet === x.id ? 
                                                        <tr>
                                                            <td>
                                                                <a onClick={(e) => handlePutId(flex._id)} className="w-100 text-primary" href="javascript:void(0);"><BsPencil className="bs-5x" /></a>
                                                                {' '}
                                                                <a onClick={(e) => handleDelete(flex._id)} className="w-100 text-danger" href="javascript:void(0);"><strong><VscChromeClose className="vsc-5x" /></strong></a>
                                                            </td>
                                                            <td>
                                                                R${flex.valor}
                                                            </td>
                                                            <td>
                                                                {flex.motivo}
                                                            </td>
                                                            <td>
                                                                {Moment.utc(flex.criado).format('DD/MM/YYYY')}
                                                            </td>
                                                        </tr>
                                                    : ''}
                                                    </>
                                                )
                                            })}</>
                                            :
                                            ''}
                                            </>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="modal" show={modalDefault} onHide={modalDefaultClose}>
                <Modal.Header>
                    <p className="text-left pt-2"><h1><strong>Alterar</strong></h1></p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-10 offset-1">
                            <form onSubmit={handlePut}>
                                <div className="form-group text-left">
                                    <label htmlFor="idCliente">Cliente</label>
                                    <select className="form-control" id="idCliente" onChange={e => setIdUsuarioPut(e.target.value)} disabled>
                                        {placeholders.map(placeholder => {
                                            return (
                                                <>
                                                    {(placeholder.id.toString()).localeCompare(idUsuarioPut) ? '' : <option selected value={`${placeholder.id}`}>{placeholder.name}</option>}
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group text-left">
                                    <label htmlFor="idMotivo">Motivo</label>
                                    <input type="text" className="form-control" id="idMotivo" placeholder={motivoPut} onChange={e => setMotivoPut(e.target.value)} />
                                </div>
                                <div className="form-group text-left w-50">
                                    <label htmlFor="idValor">Valor</label>
                                    <input type="number" className="form-control" id="idValor" placeholder={valorPut} onChange={e => setValorPut(e.target.value)} />
                                </div>
                                <hr />
                                <div className="mb-0 form-group row justify-content-center">
                                    <button type="submit" className="btn btn-green m-2"><strong>Alterar</strong></button>
                                    <button type="button" className="btn btn-red m-2" onClick={modalDefaultClose}><strong>Cancelar</strong></button>
                                </div>
                            </form>
                            <br />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </TestStyled>
    )
}