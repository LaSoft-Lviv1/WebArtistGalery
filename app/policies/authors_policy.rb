class AuthorsPolicy < ApplicationPolicy
  class Scope < Scope

    def create?
      @user.admin? || @user.artist?
    end

    def new?
      create?
    end

    def update?
      @user.admin? || (@user.artist? && @user.artist.id == @record.id)
    end

    def edit?
      update?
    end

    def destroy?
      @user.admin? || (@user.artist? && @user.artist.id == @record.id)
    end

    def resolve
      scope
    end
  end
end
