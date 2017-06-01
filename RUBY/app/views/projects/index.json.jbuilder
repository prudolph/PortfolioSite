json.array!(@projects) do |project|
  json.extract! project, :id, :title, :overview, :description, :experience, :facts
  json.url project_url(project, format: :json)
end
