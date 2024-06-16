import React from "react";
import { 
  Col, Button, Card, CardContent, Cell, TextBoxBigTitle, 
  TextBoxBiggerTitle, Stepper, Display2, Display3
} from "@salutejs/plasma-ui";

import AppCss from './App.module.css';

import { createAssistant, createSmartappDebugger } from '@salutejs/client';


const epley = (M, k) => (M * k) / 30 + M;
const brzycki = (M, k) => M * (36 / (37 - k));
const lander = (M, k) => (100 * M) / (101.3 - 2.67123 * k);
const oConner = (M, k) => M * (1 + 0.025 * k);

const calculate_max = (M, k) => {
    const epley1RM = epley(M, k);
    const brzycki1RM = brzycki(M, k);
    const lander1RM = lander(M, k);
    const oConner1RM = oConner(M, k);

    const average1RM = (epley1RM + brzycki1RM + lander1RM + oConner1RM) / 4;

    return average1RM;
};

const initializeAssistant = (getState) => {
  if (process.env.NODE_ENV === 'development') {
      console.log(`process.env.REACT_APP_TOKEN: ${process.env.REACT_APP_TOKEN}`);
      return createSmartappDebugger({
          token: process.env.REACT_APP_TOKEN ?? '',
          initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
          getState,
      });
  } else {
      return createAssistant({ getState });
  }
};


export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        weight: 0,
        reps: 0,
        maxWeight: 0,
        error: ''
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event) => {
        console.log(`assistant.on(data)`, event);
        if (event.type === 'character') {
            console.log(`assistant.on(data): character: "${event?.character?.id}"`);
        } else if (event.type === 'insets') {
            console.log(`assistant.on(data): insets`);
        } else {
            const { action } = event;
            this.dispatchAssistantAction(action);
        }
    });

    this.assistant.on('start', (event) => {
        let initialData = this.assistant.getInitialData();
        console.log(`assistant.on(start)`, event, initialData);
    });

    this.assistant.on('command', (event) => {
        console.log(`assistant.on(command)`, event);
    });

    this.assistant.on('error', (event) => {
        console.log(`assistant.on(error)`, event);
    });

    this.assistant.on('tts', (event) => {
        console.log(`assistant.on(tts)`, event);
    });
}

    getStateForAssistant() {
        const state = {
            weight: this.state.weight,
            reps: this.state.reps,
        };
        return state;
    }

    dispatchAssistantAction(action) {
        console.log('dispatchAssistantAction', action);
        if (action) {
            switch (action.type) {
                case 'add_weight':
                    return this.add_weight(action);

                case 'add_reps':
                    return this.add_reps(action);

                case 'subtract_weight':
                    return this.subtract_weight(action);

                case 'subtract_reps':
                    return this.subtract_reps(action);

                case 'set_weight':
                    return this.set_weight(action);

                case 'set_reps':
                    return this.set_reps(action);

                default:
                    throw new Error();
            }
        }
    }

    add_weight(action) {
        console.log('add_weight', action);
        this.setState((prevState) => {
            const newWeight = prevState.weight + action.weight;
            if (newWeight > 200) {
                return { error: 'ага, поверил' };
            } else {
                return { weight: newWeight, error: '' };
            }
        });
    }

    add_reps(action) {
        console.log('add_reps', action);
        this.setState((prevState) => ({ reps: prevState.reps + action.reps, error: '' }));
    }

    subtract_weight(action) {
        console.log('subtract_weight', action);
        this.setState((prevState) => {
            const newWeight = prevState.weight - action.weight;
            if (newWeight < 0) {
                return { error: 'Вес не может быть отрицательным' };
            } else {
                return { weight: newWeight, error: '' };
            }
        });
    }

    subtract_reps(action) {
        console.log('subtract_reps', action);
        this.setState((prevState) => {
            const newReps = prevState.reps - action.reps;
            if (newReps < 0) {
                return { error: 'Повторы не могут быть отрицательными' };
            } else {
                return { reps: newReps, error: '' };
            }
        });
    }

    set_weight(action) {
        console.log('set_weight', action);
        if (action.weight < 0) {
            this.setState({ error: 'Вес не может быть отрицательным' });
        } else if (action.weight > 300) {
            this.setState({ error: 'ага, поверил' });
        } else {
            this.setState({ weight: action.weight, error: '' }, () => {
                this.assistant.sendData({ action: { action_id: 'tts', parameters: { text: `Вес установлен на ${this.state.weight} килограммов` } } });
            });
        }
    }

    set_reps(action) {
        console.log('set_reps', action);
        if (action.reps < 0) {
            this.setState({ error: 'Повторы не могут быть отрицательными' });
        } else {
            this.setState({ reps: action.reps, error: '' }, () => {
                this.assistant.sendData({ action: { action_id: 'tts', parameters: { text: `Повторы установлены на ${this.state.reps}` } } });
            });
        }
    }

    calculateMaxWeight() {
        const { weight, reps } = this.state;
        const maxWeight = calculate_max(reps, weight);
        this.setState({ maxWeight });
    }

    _send_action_value(action_id, value) {
        const data = {
            action: {
                action_id: action_id,
                parameters: {
                    value: value,
                },
            },
        };
        const unsubscribe = this.assistant.sendData(data, (data) => {
            const { type, payload } = data;
            console.log('sendData onData:', type, payload);
            unsubscribe();
        });
    }

  render() {
    let { weight, reps, maxWeight, error } = this.state;
    return (
      <div>
        <Card className={AppCss.maincard} style={{ width: '90%' }}>
              <CardContent>
                <Col>  
                  <Cell className={AppCss.heading} content={<TextBoxBiggerTitle>Ваши силовые показатели</TextBoxBiggerTitle>}/>

                  <Cell content={<TextBoxBigTitle>Вес штанги</TextBoxBigTitle>} 
                      contentRight={
                        <Stepper
                          step={5}
                          value={weight}
                          min={0}
                          max={300}
                          ariaLabelDecrement="Уменьшить значение"
                          ariaLabelIncrement="Увеличить значение"
                        />
                    }
                  />

                  <Cell content={<TextBoxBigTitle>Количество повторений</TextBoxBigTitle>} 
                      contentRight={
                        <Stepper
                          step={1}
                          value={reps}
                          min={1}
                          max={12}
                          ariaLabelDecrement="Уменьшить значение"
                          ariaLabelIncrement="Увеличить значение"
                        />
                      }
                  />
                      </Col> 
                  </CardContent>

                  <Button className={AppCss.countbutton} text="Рассчитать 1ПМ" size="s" view="overlay"
                    onClick={() => {
                        maxWeight=this.calculateMaxWeight(reps, weight);
                    }}
                  />
                  
                  <Display2 className={AppCss.resmsg}>Ваш одноповторный максимум составляет</Display2>
                  <Display3 className={AppCss.resvalue}>{maxWeight}</Display3>
                  <Display2 className={AppCss.reskg}>килограмм</Display2>
              </Card>
        </div>
    );
  }
}
