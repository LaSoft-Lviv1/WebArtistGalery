class ShoppingCatrsPolicy < ApplicationPolicy
  class Scope < Scope

    def index?
      @user.admin? || @user.customer?
    end

    def create?
      @user.admin? || @user.customer?
    end

    def new?
      create?
    end

    def update?
      @user.admin? || @user.customer?
    end

    def edit?
      update?
    end

    def destroy?
      @user.admin? || @user.customer?
    end

    def resolve
      scope
    end
  end
end
