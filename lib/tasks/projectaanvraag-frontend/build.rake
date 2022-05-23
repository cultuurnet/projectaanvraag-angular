namespace 'projectaanvraag-frontend' do
  desc "Build binaries"
  task :build do |task|
    system('npm install') or exit 1
    system('npm run bower -- install') or exit 1
    system('angular_config hash -c config.dist.json > config.json') or exit 1
    system('npm run build') or exit 1
  end
end
