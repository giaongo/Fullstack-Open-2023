import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

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

describe('Testing button togglable', () => {
  let container;
  const likeMockHandler = jest.fn();
  beforeEach(() => {
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
    container= render(<Blog blog={blog} increaseLikeNumber={likeMockHandler}/>).container;
  });

  test('clicking the button shows the url and likes', async () => {
    const detailBtn = screen.getByText('view');
    const user = userEvent.setup();
    await user.click(detailBtn);
    const toggleBody = container.querySelector('.togglableContent');
    expect(toggleBody).not.toHaveStyle('display:none');
  });

  test('clicking like button twice', async () => {
    const detailBtn = screen.getByText('view');
    const user = userEvent.setup();
    await user.click(detailBtn);
    const likeBtn = screen.getByText('Like');
    for (let i = 0; i < 2; i++) {
      const user1 = userEvent.setup();
      await user1.click(likeBtn);
    }
    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});

describe('testing the form', () => {

  test('blog form', async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();
    const { container } = render(<NewBlogForm createNewBlog={createBlog}/>);
    const inputTitle = container.querySelector('#title-input');
    const inputAuthor = container.querySelector('#author-input');
    const inputUrl = container.querySelector('#url-input');

    await user.type(inputTitle, 'testing with form...');
    await user.type(inputAuthor, 'test');
    await user.type(inputUrl, 'test.com');

    const submitBtn = screen.getByText('Create');
    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toBe('testing with form...');
    expect(createBlog.mock.calls[0][1]).toBe('test');
    expect(createBlog.mock.calls[0][2]).toBe('test.com');

  });
});


