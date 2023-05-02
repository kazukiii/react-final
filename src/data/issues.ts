import { Issue } from '../../types/issue'

function createIssue(id: string, title: string): Issue {
  return {
    id,
    title,
    state: 'open',
    url: `https://example.com/issue/${id}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const issues: Issue[] = [
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b581', 'Issue 01'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b582', 'Issue 02'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b583', 'Issue 03'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b584', 'Issue 04'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b585', 'Issue 05'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b586', 'Issue 06'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b587', 'Issue 07'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b588', 'Issue 08'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b589', 'Issue 09'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b590', 'Issue 10'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b591', 'Issue 11'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b592', 'Issue 12'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b593', 'Issue 13'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b594', 'Issue 14'),
  createIssue('04ec8cfd-7107-4b04-94bc-13471f11b595', 'Issue 15'),
]
