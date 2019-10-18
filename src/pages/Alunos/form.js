import React from "react";

import { Row, Col, Input, InputNumber, Select, Button } from "antd";

import { Link } from "react-router-dom";

import api from "../../services/api";

const { Option } = Select;

export default class FormAluno extends React.Component {
  state = {
    nome: "",
    idade: null,
    matricula: null,
    email: "",
    curso: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const response = await api.get(`/alunos/${id}`);

      const { nome, idade, matricula, email, curso } = response.data;
      console.log(response.data);
      this.setState({
        nome,
        idade,
        matricula,
        email,
        curso
      });
    }
  }

  checkDisabled = () => {
    const { nome, idade, matricula, email, curso } = this.state;

    return nome === "" || !idade || !matricula || email === "" || curso === "";
  };

  handleConfirm = async () => {
    const { id } = this.props.match.params;

    if (id) {
      await api.put(`/alunos/${id}`, this.state);
    } else {
      await api.post("/alunos", this.state);
    }

    this.props.history.push("/alunos");
  };

  render() {
    return (
      <div style={{ backgroundColor: "#fff", padding: 24 }}>
        <h1>Cadastro</h1>
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <span>Nome</span>
            <Input
              onChange={e => this.setState({ nome: e.target.value })}
              value={this.state.nome}
            />
          </Col>
          <Col span={6}>
            <span>Matrícula</span>
            <InputNumber
              style={{ display: "block", width: "100%" }}
              onChange={value => this.setState({ matricula: value })}
              value={this.state.matricula}
            />
          </Col>
          <Col span={6}>
            <span>Idade</span>
            <InputNumber
              style={{ display: "block", width: "100%" }}
              onChange={value => this.setState({ idade: value })}
              value={this.state.idade}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <span>Email</span>
            <Input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </Col>
          <Col span={12}>
            <span>Curso</span>
            <Select
              showSearch
              style={{ display: "block" }}
              onChange={value => this.setState({ curso: value })}
              value={this.state.curso}
            >
              <Option value="Engenharia de Computação">
                Engenharia de Computação
              </Option>
              <Option value="Ciência da Computação">
                Ciência da Computação
              </Option>
              <Option value="Matemática Computacional">
                Matemática Computacional
              </Option>
            </Select>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }} type="flex" justify="end" gutter={16}>
          <Col>
            <Link to="/alunos">
              <Button type="default">Cancelar</Button>
            </Link>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={this.checkDisabled()}
              onClick={() => this.handleConfirm()}
            >
              Confirmar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
