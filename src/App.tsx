import React from 'react';

enum ParamType {
  String = 'string',
  Number = 'number',
}

type Color = string

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
      paramValue.paramId === parseInt(id) ? { ...paramValue, value } : paramValue
    );
  
    this.setState({ paramValues: updatedParamValues });
  };

  
  getModel = () => {
    const { params } = this.state;

    return Object.keys(params).map((key: string) => {
      const paramKey = parseInt(key)
      return {
        id: paramKey,
      }
    })
  };

  render() {
    const { params, paramValues } = this.state;
    
    return (
      <div>
        {
          Object.values(paramValues).map((item) => {
            const { paramId, value} = item;
            const currParams = Object.values(params).filter((value) => (value.id) === paramId)[0];
            console.log('map -', paramId, typeof paramId, ' / ', value)
            return (
            <div key={paramId}>
              <label htmlFor={`{paramId}`}>{currParams.name}</label>
              <input
                type={currParams.type}
                id={`${paramId}`}
                name={`param-${paramId}`}
                value={value || ''}
                onChange={this.handleParamChange}
              />
            </div>
          )})
        }
      </div>
    );
  }
}

const params: Param[]  = [
  {
    id: 1,
    name: 'Назначение',
    type: ParamType.String,
  },
  {
    id: 2,
    name: 'Длина',
    type: ParamType.String,
  },
  {
    id: 3,
    name: 'Количество',
    type: ParamType.Number,
  }
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное'
    },
    {
      paramId: 2,
      value: 'макси'
    },
    {
      paramId: 3,
      value: '10'
    }
  ],
};

const App: React.FC = () => {
  return (
    <main className="col-12 col-md-8 col-xxl-6">
      <h3>Редактор параметров</h3>
      <ParamEditor params={params} model={model} />
    </main>
  );
}

export default App;