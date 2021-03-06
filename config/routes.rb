Rails.application.routes.draw do
  
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :show] do
      resources :stocks, only: [:index, :create, :update, :destroy]
      resources :transactions, only: [:index, :create]
    end
    resource :session, only: [:create, :destroy]
  end

end