const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Cinderella',
  lastName: 'Tremaine',
  email: 'ilostmyshoe@cinder.com',
  password: 'gussguss'
};

const registerAndLogin = async (userProps = {}) => {
  userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const resp = await agent
    .post('/api/v1/users')
    .send({ ...mockUser, ...userProps });
  const user = resp.body;
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it ('List of tasks calls GET /api/v1/todos/ and lists all todos for the authenticated user', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/todos');
    expect(res.status).toBe(200);
  });

  it ('PUT updates list of todos to completed', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.put('/api/v1/todos/3').send({
      complete: true,
    });
    expect(res.status).toBe(200);
    expect(res.body.complete).toBe(true);
  });

  it('#POST should create a new chore in form', async () => {
    const [agent] = await registerAndLogin();
    const newTodo = {
      'qty': '1',
      'todo': 'Pay Alfred',
      'location': '',
      'description': '',
    };
    const res = await agent.post('/api/v1/todos').send(newTodo);
    expect(res.body).toEqual({
      id: expect.any(String),
      user_id: expect.any(String),
      ...newTodo,
    });
  });






  afterAll(() => {
    pool.end();
  });
});
