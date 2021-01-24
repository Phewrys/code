
export default function Test() {

    return (
        <>
            <div style={{ fontSize: '70px' }}><strong>code<span>7</span></strong></div>
            <div className="container shadow" style={{ width: '900px' }}>
                <div className="row justify-content-start">
                    <div className="col-3">
                        <div className="row justify-content-center">
                            <div className="col-12 shadow m-2" style={{ width: '500px' }}>FULANO</div>
                        </div>
                    </div>
                    <div className="col-7 m-2">
                        <div className="shadow row justify-content-end">
                            <div className="col-12">
                                <div className="container">
                                    <form>
                                        <div className="form-group text-left">
                                            <label htmlFor="idCliente">Cliente</label>
                                            <select className="form-control" id="idCliente" required>
                                                <option selected>-- Selecionar --</option>
                                                <option selected>1</option>
                                                <option selected>2</option>
                                                <option selected>3</option>
                                            </select>
                                        </div>
                                        <div className="form-group text-left">
                                            <label htmlFor="idMotivo">Motivo</label>
                                            <input type="text" className="form-control" id="idMotivo" placeholder="Ex: dívida cartão de crédito" required />
                                        </div>
                                        <div className="form-group text-left w-50">
                                            <label htmlFor="idValor">Valor</label>
                                            <input type="number" className="form-control" id="idValor" placeholder="Ex: R$ 500,00" required />
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
        </>
    )
}