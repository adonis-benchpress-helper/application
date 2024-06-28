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

const calculate_maximum = (M, k) => {
    const epley1RM = epley(M, k);
    const brzycki1RM = brzycki(M, k);
    const lander1RM = lander(M, k);
    const oConner1RM = oConner(M, k);

    const average1RM = (epley1RM + brzycki1RM + lander1RM + oConner1RM) / 4;

    return Math.ceil(average1RM);
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
        weight: 100,
        reps: 8,
        maxWeight: 124,
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
                case 'increase_weight':
                    return this.increase_weight(action);

                case 'decrease_weight':
                    return this.decrease_weight(action);

                case 'decrease_reps':
                    return this.decrease_reps(action);

                case 'increase_reps':
                    return this.increase_reps(action);

                case 'calculate_max':
                    return this.calculate_max(action);

                default:
                    throw new Error();
            }
        }
    }

    increase_weight(action) {
        document.querySelector('[aria-label="Увеличить вес"]').click();

    }

    decrease_weight(action) {
        document.querySelector('[aria-label="Уменьшить вес"]').click();
    }
    
    increase_reps(action) {
        document.querySelector('[aria-label="Увеличить повторения"]').click();
    }

    decrease_reps(action) {
        document.querySelector('[aria-label="Уменьшить повторения"]').click();
    }
    

    calculate_max(action) {
        const { weight, reps } = action;
        const maxWeight = Math.ceil(calculate_maximum(weight, reps));
        this.setState({ maxWeight }, () => {
            this.assistant.sendData({ 
                action: {
                    action_id: 'cm', 
                    parameters: { 
                        text: `Ваш одноповторный максимум составляет ${this.state.maxWeight} килограммов` 
                    } 
                }
            });
        });
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
                  <Cell className={AppCss.heading} 
                        content={<TextBoxBiggerTitle>Ваши силовые показатели</TextBoxBiggerTitle>}
                  />

                  <Cell content={<TextBoxBigTitle>Вес штанги</TextBoxBigTitle>} 
                      contentRight={
                        <Stepper
                          step={5}
                          value={weight}
                          min={0}
                          max={300}
                          onChange={(value) => this.setState({ weight: value })}
                          ariaLabelDecrement="Уменьшить вес"
                          ariaLabelIncrement="Увеличить вес"
                        />
                    }
                  />

                  <Cell content={<TextBoxBigTitle>Количество повторений</TextBoxBigTitle>} 
                      contentRight={
                        <Stepper
                          step={1}
                          value={reps}
                          min={2}
                          max={12}
                          onChange={(value) => this.setState({ reps: value })}
                          ariaLabelDecrement="Уменьшить повторения"
                          ariaLabelIncrement="Увеличить повторения"
                        />
                      }
                  />
                </Col> 
            </CardContent>

            <Button className={AppCss.countbutton} text="Рассчитать 1ПМ" size="s" view="overlay"
                onClick={() => {this.setState({ maxWeight: calculate_maximum(weight, reps) })}}
            />
            
            <Display2 className={AppCss.resmsg}>Ваш одноповторный максимум составляет</Display2>
            <Display3 className={AppCss.resvalue}>{maxWeight}</Display3>
            <Display2 className={AppCss.reskg}>килограмм</Display2>
         </Card>
        </div>
    );
  }
}
