import React from "react";

/**
 * Перечисление ParamType используется как тип input.
 * Сделано для расширения типов параметров.
 * Например:
 * enum ParamType {
 *   String = 'text',
 *   Number = 'number',
 *   Date = 'date',
 * }
 */
enum ParamType {
  String = "text",
  Number = "number",
  Date = "date",
}

type Color = string;

interface Param {
  id: number;
  name: string;
  type: ParamType;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  params: Param[];
  paramValues: ParamValue[];
  colors?: Color[] | [];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      params: this.props.params,
      paramValues: this.props.model.paramValues,
      colors: this.props.model.colors || [],
    };
  }

  handleParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    const updatedParamValues = this.state.paramValues.map((paramValue) =>
      paramValue.paramId === parseInt(id)
        ? { ...paramValue, value }
        : paramValue
    );

    this.setState({ paramValues: updatedParamValues });
  };

  /**
   * Метод для получения подставленных значений, возвращает объект вида:
   * {
   *  "Назначение": "повседневное",
   *  "Длина": "макси"
   *  }
   */
  getModel = () => {
    const { params, paramValues } = this.state;

    return Object.keys(paramValues).reduce((acc, key: string) => {
      const paramKey = parseInt(key);
      return {
        ...acc,
        ...acc,
        [params[paramKey].name]: paramValues[paramKey].value,
      };
    }, {});
  };

  render() {
    const { params, paramValues } = this.state;

    return (
      <div className="card shadow-sm d-flex flex-column gap-2 p-4">
        {paramValues.map((item) => {
          const { paramId, value } = item;
          const currParams = params.filter((value) => value.id === paramId)[0];
          return (
            <div key={paramId} className="input-group">
              <label className="col-2" htmlFor={`{paramId}`}>
                {currParams.name}
              </label>
              <input
                className="form-control"
                type={currParams.type}
                id={`${paramId}`}
                name={`param-${paramId}`}
                value={value}
                onChange={this.handleParamChange}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: ParamType.String,
  },
  {
    id: 2,
    name: "Длина",
    type: ParamType.String,
  },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const App: React.FC = () => {
  return (
    <main className="h-100 container-fluid d-flex justify-content-center">
      <div className="h-100 col-9 col-md-7 col-xxl-5 d-flex flex-column justify-content-center gap-4">
        <h3 className="text-center">Редактор параметров</h3>
        <ParamEditor params={params} model={model} />
      </div>
    </main>
  );
};

export default App;
