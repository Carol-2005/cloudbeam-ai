// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />
// }

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
      
      {/* Floating Video Upload Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce opacity-20">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-32 animate-pulse opacity-15">
          <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-16 animate-ping opacity-10">
          <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
        </div>
        
        <div className="absolute top-60 left-1/2 animate-bounce opacity-20" style={{animationDelay: '1s'}}>
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9,12L11,14L15,10M20.59,12C20.59,16.24 17.35,19.69 13.22,20C9.09,19.69 5.85,16.24 5.85,12C5.85,7.76 9.09,4.31 13.22,4C17.35,4.31 20.59,7.76 20.59,12Z" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-20 animate-pulse opacity-25" style={{animationDelay: '2s'}}>
          <svg className="w-14 h-14 text-info" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5M10.5,14L8,11.5L6.5,13L10.5,17L17.5,10L16,8.5L10.5,14Z" />
          </svg>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40v40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4 backdrop-blur-sm border border-primary/30">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Join VideoHub
            </h1>
            <p className="text-base-content/70 text-sm">
              Create, upload, and share your videos with the world
            </p>
          </div>

          {/* Clerk SignUp Component Container */}
          <div className="card bg-base-100/80 backdrop-blur-xl shadow-2xl border border-base-300/50">
            <div className="card-body p-6">
              {/* Custom styling wrapper for Clerk component */}
              <div className="clerk-signup-wrapper">
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "text-base-content font-semibold",
                      headerSubtitle: "text-base-content/70",
                      socialButtonsBlockButton: "btn btn-outline btn-sm normal-case",
                      formButtonPrimary: "btn btn-primary w-full normal-case",
                      formFieldInput: "input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary",
                      footerActionLink: "link link-primary link-hover",
                      identityPreviewText: "text-base-content/70",
                      formFieldLabel: "label-text font-medium text-base-content",
                      otpCodeFieldInput: "input input-bordered text-center",
                      formFieldWarningText: "text-error text-sm",
                      formFieldSuccessText: "text-success text-sm",
                      dividerLine: "border-base-300",
                      dividerText: "text-base-content/50"
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      showOptionalFields: true
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-base-content/50 text-xs flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.5V11.5H13.5V10.5C13.5,8.7 12.8,8.2 12,8.2Z" />
              </svg>
              Your data is secure and encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>
  )
}