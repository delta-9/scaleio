import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppWrapper from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Section from 'grommet/components/Section';
import request from '../../utils/request';
import createLayout from '../../predictUI/createLayout';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import FaBeer from 'react-icons/lib/fa/beer';

const predictSettings = {
  grid: true,
  width: 500,
  height: 500,
};

class App extends Component {
  componentWillMount() {
    request('/model.json')
      .then((json) => { this.predictInit(json.data)});
  }
  predictInit(model) {
    this.predict = createLayout(document.getElementById('predict'), model);
  }
  render() {
    return (
      <AppWrapper className="App">
        <Split
          fixed={false}
          priority='left'
          flex='right'
          separator={false}
          showOnResponsive='both'
        >
          <Sidebar>
            <Accordion>
              <AccordionPanel heading='First Title'>
                <Paragraph>
                  
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading='Second Title'>
                <Paragraph>
                  
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading='Third Title'>
                <Paragraph>
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                  <Button icon={<FaBeer />}
                    label='Label'
                    onClick={() => {}}
                    href='#'
                    plain={false}
                    critical={false}
                    accent={false}
                    secondary={false}
                    primary={true} 
                  />
                </Paragraph>
              </AccordionPanel>
            </Accordion>
          </Sidebar>
          <Section>
          </Section>
        </Split>
      </AppWrapper>
    );
  }
}

export default App;
