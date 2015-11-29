Rails.application.routes.draw do
  resources :agencies
  root 'welcome#index'
end
