json.array!(@agencies) do |agency|
  json.extract! agency, :id, :name, :address, :services, :description
  json.url agency_url(agency, format: :json)
end
