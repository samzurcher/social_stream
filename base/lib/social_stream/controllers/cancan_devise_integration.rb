module SocialStream
  module Controllers
    # Common methods added to ApplicationController
    module CancanDeviseIntegration
      extend ActiveSupport::Concern
      
      module InstanceMethods

        private

        # Redirect to login if the user is trying to access a protected resource
        # and she is not authenticated
        def rescue_from_access_denied
          unless user_signed_in?
            redirect_to new_user_session_path
          end
        end
      end
    end
  end
end

