export const BEGINNER_PROJECTS = {
  frontend: [
    { id: 'portfolio_landing', req: { frontend: 2, design: 1 } },
    { id: 'ui_redesign', req: { frontend: 2, design: 2 } },
    { id: 'dashboard_styling', req: { frontend: 3, design: 1 } }
  ],
  backend: [
    { id: 'basic_rest_api', req: { backend: 2, coding: 1 } },
    { id: 'auth_setup', req: { backend: 3, coding: 1 } },
    { id: 'crud_system', req: { backend: 2, coding: 2 } }
  ],
  ai: [
    { id: 'prompt_template', req: { ai: 2, frontend: 1 } },
    { id: 'chat_widget', req: { ai: 2, coding: 1 } },
    { id: 'content_gen_mvp', req: { ai: 3, backend: 1 } }
  ],
  devops: [
    { id: 'vps_deploy', req: { devops: 2, backend: 1 } },
    { id: 'docker_setup', req: { devops: 2, coding: 1 } },
    { id: 'cicd_fix', req: { devops: 3, backend: 1 } }
  ],
  mobile: [
    { id: 'expo_prototype', req: { mobile: 2, design: 1 } },
    { id: 'push_notif_setup', req: { mobile: 2, coding: 1 } },
    { id: 'mobile_ui_fix', req: { mobile: 3, design: 1 } }
  ]
};
