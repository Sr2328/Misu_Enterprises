-- Add additional profile fields for address
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS address TEXT;

-- Update handle_new_user to capture additional fields during signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_role app_role;
  company_name_value text;
BEGIN
  -- Get the role from metadata, default to job_seeker
  user_role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'job_seeker');
  
  -- For employers, use company_name from metadata, or fallback to full_name
  IF user_role = 'employer' THEN
    company_name_value := COALESCE(
      NEW.raw_user_meta_data->>'company_name',
      NEW.raw_user_meta_data->>'full_name'
    );
  ELSE
    company_name_value := NULL;
  END IF;

  -- Insert profile with all fields from metadata
  INSERT INTO public.profiles (
    user_id, 
    email, 
    full_name, 
    company_name,
    phone,
    address,
    work_category,
    experience_years
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    company_name_value,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'address',
    NEW.raw_user_meta_data->>'work_category',
    0
  );
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  RETURN NEW;
END;
$$;