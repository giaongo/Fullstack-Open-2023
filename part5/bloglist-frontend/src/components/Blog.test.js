import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blog content without url and likes', () => {
  const blog = {
    title: 'NTS: Reliable Device Testing at Scale',
    author:'Netflix',
    user: {
      username:'root',
      name:'root user',
      id:'640a42795751d1a5cfed5e07'
    },
    url:'https://medium.com/@free-thinker/forget-chatgpt-you-will-not-regret-using-these-ai-tools-in-2023-7c2a39cc4901',
    likes:1,
    id: '640b86d41d642c4334d1e1bd'
  };
  const { container } = render(<Blog blog={blog}/>);
  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('NTS: Reliable Device Testing at Scale - Netflix');
  expect(div).not.toHaveTextContent('1');
  expect(div).not.toHaveTextContent('https://medium.com/@free-thinker/forget-chatgpt-you-will-not-regret-using-these-ai-tools-in-2023-7c2a39cc4901');
});