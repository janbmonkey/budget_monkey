import React, { useState } from 'react';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export interface IItemEntryScreenProps {}

export const ItemEntryScreen: FC<IItemEntryScreenProps> = (props) => {
  const [item, setItem] = useState({
    itemClass: '',
  });
  return (
    <div>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Item</Form.Label>
          <Form.Control type="text" placeholder="Enter Item" name="itemClass" />
        </Form.Group>

        <button type="submit" onSubmit={(event) => event.preventDefault()}>
          Submit
        </button>
      </Form>
    </div>
  );
};
